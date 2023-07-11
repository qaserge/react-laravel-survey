<?php

namespace App\Http\Controllers;

use App\Models\User;
use DateTimeInterface;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\NewAccessToken;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->plainTextToken;        

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();
        // $token = $this->createToken('main')->plainTextToken;
        $token = $request->user()->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        // $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        // $user->currentAccessToken()->delete;
        $request->user()->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    // public function createToken(string $name, array $abilities = ['*'], DateTimeInterface $expiresAt = null)
    // {
    //     $token = $this->tokens()->create([
    //         'name' => $name,
    //         'token' => hash('sha256', $plainTextToken = Str::random(40)),
    //         'abilities' => $abilities,
    //         'expires_at' => $expiresAt,
    //     ]);

    //     return new NewAccessToken($token, $token->getKey().'|'.$plainTextToken);
    // }
}
