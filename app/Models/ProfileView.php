<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileView extends Model
{
    protected $fillable = [
        'viewer_id',
        'player_profile_id',
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
