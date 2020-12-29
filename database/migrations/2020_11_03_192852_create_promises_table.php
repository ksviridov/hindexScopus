<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promises', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('article_id');
            $table->bigInteger('author_id');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promises');
        Schema::table('promises', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
