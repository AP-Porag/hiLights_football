<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavedPlayer extends Model
{
    use HasFactory;

    protected $fillable = ['scout_id', 'player_id', 'notes', 'tags'];

    protected $casts = ['tags' => 'array'];

    public function scout(): BelongsTo
    {
        return $this->belongsTo(Scout::class);
    }

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }
}
