<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'name', 'category', 'sort_order'];
    public $timestamps = true;

    public function players(): BelongsToMany
    {
        return $this->belongsToMany(Player::class, 'player_position')
            ->withPivot('is_primary')->withTimestamps();
    }
}
