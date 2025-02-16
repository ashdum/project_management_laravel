<?php

namespace App\Http\Middleware;

use Closure;
use GraphQL\Error\Error;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Nuwave\Lighthouse\Execution\ErrorHandler;

class GraphQLErrorHandler implements ErrorHandler
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }

}
