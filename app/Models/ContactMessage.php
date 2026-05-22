<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'status',
        'replied_by_user_id',
        'replied_at',
        'ip_address',
    ];

    protected $casts = ['replied_at' => 'datetime'];

    public function repliedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'replied_by_user_id');
    }
}
