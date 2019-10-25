<?php

namespace App\Http\Controllers;

use App\Http\Resources\GroupCollection;
use App\Models\Group;
use http\Env\Response;
use Illuminate\Http\Request;
use League\Csv\Exception;
use League\Csv\Reader;
use League\Csv\Statement;

class GroupsController extends Controller
{
    public function index()
    {
        return new GroupCollection(Group::all());
    }

    public function importGroups(Request $request)
    {
        $content = $request->input('csv');

        try {
            $csv = Reader::createFromString($content);
            $csv->setHeaderOffset(0);
            $records = (new Statement())->process($csv);
            foreach ($records as $record) {
                Group::create($record);
            }
            return response()->json(null, 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 401);
        }
    }
}
