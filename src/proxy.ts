import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname
  const pathParts = pathname.split('/').filter(Boolean)

  // Skip static assets and public landing page
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathParts.length === 0
  ) {
    return supabaseResponse
  }

  // Blacklist checking - skip validation for these paths
  const blacklist = [
    'admin',
    'api',
    'auth',
    'login',
    'register',
    'join',
    'dashboard',
    'billing',
    'support',
    'public',
    'super-admin',
  ]
  const firstPart = pathParts[0]
  if (blacklist.includes(firstPart)) {
    return supabaseResponse
  }

  // Fetch authenticated user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  const companySlug = user.user_metadata?.company_slug

  if (!companySlug) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Cross-tenant protection: redirect if slug mismatches user's company slug
  if (firstPart !== companySlug) {
    const url = request.nextUrl.clone()
    url.pathname = `/${companySlug}/dashboard`
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
