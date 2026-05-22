<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Player extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'full_name',
        'nickname',
        'slug',
        'date_of_birth',
        'gender',
        'height_cm',
        'weight_kg',
        'preferred_foot',
        'nationality_country_id',
        'birthplace_country_id',
        'birthplace_city',
        'current_club',
        'team_since',
        'agent_name',
        'is_minor',
        'guardian_name',
        'guardian_relationship',
        'guardian_email',
        'guardian_phone',
        'profile_photo_path',
        'video_url',
        'description',
        'profile_status',
        'is_featured',
        'is_verified',
        'published_at',
    ];

    protected $casts = [
        'date_of_birth'  => 'date',
        'team_since'     => 'date',
        'published_at'   => 'datetime',
        'is_minor'       => 'boolean',
        'is_featured'    => 'boolean',
        'is_verified'    => 'boolean',
        'avg_rating'     => 'decimal:2',
        'avg_technical'  => 'decimal:2',
        'avg_physical'   => 'decimal:2',
        'avg_mental'     => 'decimal:2',
    ];

    // ─── Computed attribute ───

    public function getAgeAttribute(): int
    {
        return $this->date_of_birth->age;
    }

    // ─── Relationships ───

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function nationality(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'nationality_country_id');
    }

    public function birthplaceCountry(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'birthplace_country_id');
    }

    public function positions(): BelongsToMany
    {
        return $this->belongsToMany(Position::class, 'player_position')
            ->withPivot('is_primary')
            ->withTimestamps();
    }

    public function modalities(): BelongsToMany
    {
        return $this->belongsToMany(Modality::class, 'player_modality')
            ->withTimestamps();
    }

    public function clubHistories(): HasMany
    {
        return $this->hasMany(ClubHistory::class)->orderByDesc('year');
    }

    public function profileViews(): HasMany
    {
        return $this->hasMany(ProfileView::class);
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(ScoutRating::class)->where('is_visible', true);
    }

    public function savedByScouts(): HasMany
    {
        return $this->hasMany(SavedPlayer::class);
    }

    public function adminNotes()
    {
        return $this->morphMany(AdminNote::class, 'notable');
    }

    // ─── Scopes ───

    public function scopePublished($q)
    {
        return $q->where('profile_status', 'published');
    }

    public function scopeFeatured($q)
    {
        return $q->where('is_featured', true);
    }

    public function scopeMinor($q)
    {
        return $q->where('is_minor', true);
    }
}
