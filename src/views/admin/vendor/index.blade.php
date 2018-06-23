@extends('layouts.app')

@section('title')
    All Vendors
@endsection

@section('body')

<section class="vbox">
    <section class="scrollable padder">
        <ul class="breadcrumb no-border no-radius b-b b-light pull-in">
            <li><a href="{{url('/')}}"><i class="fa fa-home"></i> Home</a></li>
            <li class="active">Workset</li>
        </ul>
        <div class="m-b-md">
            <h3 class="m-b-none">Vendor Data</h3>
        </div>
        <section class="panel panel-default">
            <header class="panel-heading">
                All Vendors Data
                
                <i class="fa fa-info-sign text-muted" data-toggle="tooltip" data-placement="bottom" data-title="ajax to load the data."></i>
            </header>
            <div class="table-responsive">
                <table class="table table-striped m-b-none" data-ride="datatables" id="table">
                    <thead>
                        <tr>
                            <th width="100px">ID</th>
                            <th width="">Vendor Name</th>
                            <th width="50%">Vendor Email</th>
                            <th width="70px">Buttons</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($vendors as $vendor )
                            <tr>
                                <td>{{ $vendor->id }}</td>
                                <td>{{ $vendor->name }}</td>
                                <td>{{ $vendor->email }}</td>
                                <td>
                                    {{ Form::open(['route' => ['vendor.destroy', $vendor->id], 'method' => 'delete', 'style'=>'display:inline-block']) }}
                                        <button type="submit" class="btn btn-sm btn-icon btn-danger" onclick="return confirm('Are you sure you want to delete this?')" ><i class="fa fa-trash-o"></i></button>
                                    {{ Form::close() }}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </section>
    </section>
 </section>

@endsection