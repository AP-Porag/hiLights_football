<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Modality extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'name'];

    public function players(): BelongsToMany
    {
        return $this->belongsToMany(Player::class, 'player_modality')->withTimestamps();
    }
}
