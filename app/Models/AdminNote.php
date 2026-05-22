<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class AdminNote extends Model
{
    use HasFactory;

    protected $fillable = ['admin_user_id', 'notable_type', 'notable_id', 'note', 'is_pinned'];
    protected $casts = ['is_pinned' => 'boolean'];

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_user_id');
    }

    public function notable(): MorphTo
    {
        return $this->morphTo();
    }
}
