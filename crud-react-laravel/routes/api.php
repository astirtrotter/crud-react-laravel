<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::resource('groups', 'GroupsController');
//Route::resource('people', 'PeopleController');
Route::get('group', 'GroupsController@index');
Route::post('group/import', 'GroupsController@importGroups');
Route::get('group/{group}', 'PeopleController@index');
Route::post('group/{group}/import', 'PeopleController@importPeople');
