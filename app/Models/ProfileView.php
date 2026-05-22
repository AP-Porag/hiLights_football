<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfileView extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_id',
        'viewer_user_id',
        'viewer_role',
        'viewer_country_id',
        'viewer_ip',
        'user_agent',
        'referrer',
        'viewed_at',
    ];

    protected $casts = ['viewed_at' => 'datetime'];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function viewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'viewer_user_id');
    }

    public function viewerCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'viewer_country_id');
    }
}
