<!DOCTYPE html>
<html>
<head>
	<title>Kundenliste</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<h1>Kundendatenbank</h1>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Id</th>
					<th>Pseudonym</th>
					<td>Alter</td>
					<td>Geschlecht</td>
					<td>Anstellung</td>
					<td>Einkommen</td>
					<td>Kompetenz</td>
					<td>Behavioral-Score</td>
					<td>CVRI-Score</td>
					<td>ITS-Score</td>
                    <td>Consumer-Score</td>
					<td>Rabatt</td>
					<td>Prämie</td>
					<td>Timestamp</td>
				</tr>
			</thead>
			<tbody>
				@foreach ($kunden as $kunde)
				<tr>
					<td>{{ $kunde->ID }}</td>
					<td>{{ $kunde->Pseudonym }}</td>
					<td>{{ $kunde->Alter }}</td>
					<td>{{ $kunde->Geschlecht }}</td>
					<td>{{ $kunde->Anstellung }}</td>
					<td>{{ $kunde->Einkommen }}</td>
					<td>{{ $kunde->Kompetenz }}</td>
					<td>{{ $kunde->behavioral }}</td>
					<td>{{ $kunde->cvri }}</td>
					<td>{{ $kunde->ITS }}</td>
					<td>{{ $kunde->Score }}</td>
					<td>{{ $kunde->Rabatt }}</td>
					<td>{{ $kunde->Prämie }}</td>
					<td>{{ $kunde->Timestamp }}</td>
				</tr>
				@endforeach
			</tbody>
		</table>
        <form method="GET" action="{{ route('kunden.search') }}">
            <input type="text" name="search" placeholder="Suche Pseudonym oder ID">
            <button type="submit">Suchen</button>
        </form>
	</div>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
