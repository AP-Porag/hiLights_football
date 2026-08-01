<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileView extends Model
{
    protected $fillable = [
        'player_profile_id',
        'viewer_id',
        'country',
        'country_code',
        'ip_address',
        'user_agent',
    ];

    // রিলেশন (যদি না থাকে)
    public function viewer()
    {
        return $this->belongsTo(User::class, 'viewer_id');
    }

    public function playerProfile()
    {
        return $this->belongsTo(PlayerProfile::class);
    }
}
