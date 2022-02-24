<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOgpInfosToOgp extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ogps', function (Blueprint $table) {
            //
            $table->string("ogp_image")->nullable()->change();
            $table->string("ogp_title")->nullable();
            $table->string("ogp_description")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ogps', function (Blueprint $table) {
            //
        });
    }
}
