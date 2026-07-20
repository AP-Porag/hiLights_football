<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlayerProfile extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'positions'    => 'array',
        'club_history' => 'array',
        'height'       => 'integer',
        'transfer_history' => 'array',
        'videos' => 'array',
        'achievements'     => 'array',
        'competitions'     => 'array',
        'matches'          => 'array',

    ];

    protected $appends = ['photo_url'];   // ← accessor-er naam, column na

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getPhotoUrlAttribute(): ?string
    {
        return $this->photo_path ? asset('storage/' . $this->photo_path) : null;
    }
    public function ratings()
    {
        return $this->hasMany(PlayerRating::class);
    }
    public function reports()
    {
        return $this->hasMany(PlayerReport::class);
    }
}
