<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'code', 'flag_emoji', 'continent', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];

    public function playersByNationality(): HasMany
    {
        return $this->hasMany(Player::class, 'nationality_country_id');
    }
}
