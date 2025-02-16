<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;

class UserQuery
{
    public function me()
    {
        return Auth::user();
    }
}
