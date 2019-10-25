<?php

namespace App\Http\Controllers;

use App\Http\Resources\PeopleCollection;
use App\Http\Resources\PersonResource;
use App\Models\Group;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use League\Csv\Exception;
use League\Csv\Reader;
use League\Csv\Statement;

class PeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($group)
    {
        $group = Group::findOrFail($group);
        return new PeopleCollection($group->people);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name'    => 'required|max:255',
            'last_name'     => 'required|max:255',
            'email_address' => 'required|email',
            'status'        => Rule::in(['active', 'archived'])
        ]);

        $person = Person::create($request->all());

        return (new PersonResource($person))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new PersonResource(Person::findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);
        $person->update($request->all());

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $person = Person::findOrFail($id);
        $person->delete();

        return response()->json(null, 204);
    }

    public function importPeople(Request $request, $groupId)
    {
        Group::findOrFail($groupId);

        $content = $request->input('csv');

        try {
            $csv = Reader::createFromString($content);
            $csv->setHeaderOffset(0);
            $records = (new Statement())->process($csv);
            foreach ($records as $record) {
                $person = Person::where('email_address', $record['email_address'])->first();
                if ($person == null)
                {
                    $person = new Person;
                    $person->group_id = $groupId;
                    $person->fill($record);
                    $person->save();
                }
            }
            return $this->index($groupId);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 401);
        }
    }
}
