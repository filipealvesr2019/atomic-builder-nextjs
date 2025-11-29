
import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/',

]);

export default clerkMiddleware(async (auth, req) => {
    // Verifica se o hostname é o que você deseja redirecionar


    // Protege as rotas se necessário
    if (isProtectedRoute(req)) {
        await auth.protect();
    }

    // Permite continuar com a requisição
    return NextResponse.next();
});

export const config = {
    matcher: [
        // Ignora arquivos internos do Next.js e todos os arquivos estáticos
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Sempre executa para rotas da API
        '/(api|trpc)(.*)',
    ],
};
