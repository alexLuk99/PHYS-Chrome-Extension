public function search(Request $request) {
    $search = $request->input('search');
    $kunden = DB::table('kunden')
      ->where('Vorname', 'LIKE', "%$search%")
      ->orWhere('Nachname', 'LIKE', "%$search%")
      ->get();
    return view('kunden', ['kunden' => $kunden]);
  }
  