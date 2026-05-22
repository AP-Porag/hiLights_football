<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();

            // ─── Identity ───
            $table->string('full_name', 150);
            $table->string('nickname', 80)->nullable();
            $table->string('slug')->unique();                    // benjamin-silva-247
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female', 'other']);

            // ─── Physical ───
            $table->unsignedSmallInteger('height_cm')->nullable();
            $table->unsignedSmallInteger('weight_kg')->nullable();
            $table->enum('preferred_foot', ['right', 'left', 'both']);

            // ─── Origin ───
            $table->foreignId('nationality_country_id')
                ->constrained('countries')->restrictOnDelete();
            $table->foreignId('birthplace_country_id')
                ->nullable()->constrained('countries')->nullOnDelete();
            $table->string('birthplace_city', 100)->nullable();

            // ─── Current Club ───
            $table->string('current_club', 150)->nullable();
            $table->date('team_since')->nullable();
            $table->string('agent_name', 150)->nullable();

            // ─── Minor Guardian ───
            $table->boolean('is_minor')->default(false);
            $table->string('guardian_name', 150)->nullable();
            $table->string('guardian_relationship', 50)->nullable();
            $table->string('guardian_email', 150)->nullable();
            $table->string('guardian_phone', 30)->nullable();

            // ─── Media ───
            $table->string('profile_photo_path')->nullable();
            $table->string('video_url', 500)->nullable();         // YouTube/Vimeo URL

            // ─── About ───
            $table->text('description')->nullable();              // max 500 chars enforced

            // ─── Status ───
            $table->enum('profile_status', ['draft', 'published', 'suspended'])
                ->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->timestamp('published_at')->nullable();

            // ─── Analytics (denormalized for performance) ───
            $table->unsignedInteger('profile_views_count')->default(0);
            $table->unsignedSmallInteger('countries_reached_count')->default(0);
            $table->unsignedSmallInteger('ratings_count')->default(0);
            $table->decimal('avg_rating', 3, 2)->default(0);
            $table->decimal('avg_technical', 3, 2)->default(0);
            $table->decimal('avg_physical', 3, 2)->default(0);
            $table->decimal('avg_mental', 3, 2)->default(0);

            $table->softDeletes();
            $table->timestamps();

            $table->index('slug');
            $table->index('profile_status');
            $table->index('is_featured');
            $table->index('nationality_country_id');
            $table->index(['profile_status', 'is_featured']);
            $table->index(['profile_status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
