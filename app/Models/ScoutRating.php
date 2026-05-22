<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScoutRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'scout_id',
        'player_id',
        'technical',
        'physical',
        'mental',
        'overall',
        'notes',
        'is_visible',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
    ];

    public function scout(): BelongsTo
    {
        return $this->belongsTo(Scout::class);
    }

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function scopeVisible($q)
    {
        return $q->where('is_visible', true);
    }
}
