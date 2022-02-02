<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * いいね情報
 */
class CreateLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            // 対象の投稿
            $table->unsignedBigInteger("entry_id");
            // いいねしたユーザー
            $table->unsignedBigInteger("user_id");
            $table->timestamps();
            
            $table->unique([
                "entry_id",
                "user_id"
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('likes');
    }
}
