<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlayerRating extends Model
{

    protected $casts = [
        'technical' => 'float',
        'physical'  => 'float',
        'mental'    => 'float',
    ];

    public function player()
    {
        return $this->belongsTo(User::class, 'player_profile_id');
    }
    protected $guarded = ['id'];

    public function scout(): BelongsTo
    {
        return $this->belongsTo(User::class, 'scout_id');
    }

    public function playerProfile(): BelongsTo
    {
        return $this->belongsTo(PlayerProfile::class);
    }
}
