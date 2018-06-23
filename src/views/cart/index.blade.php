@extends('layouts.front')

@section('content')
<hr><hr><hr>
<div class="container-fluid bg-2">
	<h3>Cart Items</h3>

    {!! Form::open(array('route'=>'cart.store', 'enctype' => 'form-data')) !!}
                    
                    
	<table class='table'>
		
		<tbody>
			@foreach($cartItems as $cartItem)
				<tr>
					<td class="menulist">
						<div class="menu-img">
							<img src="{{ asset('images/'.$cartItem->options->image) }}">
						</div>
					</td>
                    <td>
                        <div class="form-group">
                            <label>Date</label>
                            {!! Form::text('date'.$cartItem->id, '', ['placeholder'=>'Click to select date', 'class'=>'datepicker','required']) !!}

                             <!-- <input type="text" class="datepicker">< -->
                        </div>
                    </td>
					<td>
						<div>
							<h4>{{$cartItem->name}}</h4>
                            <!-- <h4>{{date_default_timezone_set('Asia/Kolkata')}} {{date('Y-m-d H:i:s')}}</h4> -->
							<div><i class="fa fa-inr"></i> &nbsp;{{$cartItem->price}}</div>
						</div>
					</td>
					<td class= "menuinfo">
						
						<div><a href="{{route('cart.increase',$cartItem->rowId)}}" class="btn btn-success">+</a>{{$cartItem->qty}}<a href="{{route('cart.decrease',$cartItem->rowId)}}" class="btn btn-success">-</a></div>
					</td>
					<td class="subtotal"><i class="fa fa-inr"></i>&nbsp;{{$cartItem->price * $cartItem->qty}}</td>
					<td class="cart-remove"><a href="{{ route('cart.remove', $cartItem->rowId) }}">x</a></td>
				</tr>
			@endforeach
		</tbody>
	</table>
	<div class=" clearfix cartCheckout push bg-success mb30">
            <div class="col-lg-6 col-sm-6 common-form">
                <div class="promocodeContainer">
                    <div class="promocodeTitle">
                        <p>
                            Do you have promo code?
                        </p>
                    </div>
                    <div class="form-group updateCart_div">
                        <input class="form-control" type="text" id="promovalue" name="cart[promo_code]" placeholder="ENTER HERE">
                            <button type="button" data-flag="false" class="btn btn-info" id="apply_promocode">
                                <i class="fa fa-check"></i> APPLY PROMOCODE
                            </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-lg-offset-1 col-sm-6 ">
                <div class="input-wrapper">
					<div class="cartContent ">
                        <p>
                            Sub Total
                        </p>

                        <label id="lblnetamount" name="lblnetamount"><i class="fa fa-inr"></i> &nbsp;{{Cart::subtotal()}}</label>
                    </div>
                    <div class="cartContent ">
                        <p>
                            Discount
                        </p>

                    	<label id="lblapplieddisc" name="lblapplieddisc"><i class="fa fa-inr"></i> &nbsp;0.00 </label>
                    </div>
                    <div class="cartContent ">
                        <p>
                        	Tax
                        </p>

                        <label id="lbltaxamt" name="lbltaxamt&quot;"><i class="fa fa-inr"></i> &nbsp;0.00</label>
                    </div>
                    <div class="cartContent ">
                        <p>
                            Delivery Charges
                        </p>

                    	<label id="lbldeliverycharge" name="lbldeliverycharge&quot;"><i class="fa fa-inr"></i> &nbsp;20.00 </label>
                    </div>
                    <div class="cartContent totalAmt">
                    	<p class="">
                            Total Amount
                        </p>

                    	<label id="lbltotalamount" name="lbltotalamount" lbltotalamount="80"><i class="fa fa-inr"></i>&nbsp;{{Cart::subtotal()+20}}.00</label>
                    </div>
                </div>
            </div>
            
    </div>
    <div class="cartCheckout orderSummary clearfix push mb30">
        <h4 style="padding-left: 15px;">Payment Mode</h4>

        <div class="row col-lg-12 col-md-12 col-sm-12 col-xm-12">
	        <div class="col-lg-3 col-md-4 col-sm-4 col-xm-4 common-form">
	          <div class="form-group">
	                   <select id="selectPaymentOption" name="cart[payment_mode]">
	                        <option value="0">Choose Payment Option</option>
	                        <option value="cod"> Cash on delivery</option>
	                        <option value="neft"> NEFT</option>
	                        <option value="cheque"> Cheque</option>
	                        <option value="online"> Pay online</option>
	          <option value="wallet"> Use wallet</option>
	                    </select>
	            </div>
	        </div>

            <div class="col-lg-5 col-md-4 col-sm-4 col-xm-4 common-form">
                <div class="Paymentdetails_container">
                    <div class="wallet_details" style="display: none;">
                        <p class="paymentDetails">
                            <strong></strong> Usable Balance
                        </p>
                    </div>
                    <div id="cod_details" style="display: none;">
                                                                                <p class="paymentDetails">
                                Please call on this number 9637385585 to confirm your order.
                        </p>
                                                                            </div>
                    <div class="neft_details" style="display: none;">
                            <p>
                                    Account Name : <label>Complacent Foodech Private Limited</label>
                            </p>
                            <p>
                                    Bank Name : <label>State Bank of India</label>
                            </p>
                            <p>
                                    Account Number :<label>36030899221</label>
                            </p>
                            <p>
                                    IFSC CODE : <label>SBIN0004884</label>
                            </p>
                                            <p>
                                    <input class="form-control" type="text" name="cart[neft]" id="neftid" placeholder="Enter NEFT Transaction No.">
                            </p>
                            <p class="paymentDetails">
                                    Please call on this number 9637385585 to confirm your order.
                            </p>
                    </div>
                    <div class="chq_details" style="display: none;">
                        <p>
                                Account Name : <label>Complacent Foodech Private Limited</label>
                        </p>
                        <p>
                                Bank Name : <label>State Bank of India</label>
                        </p>
                        <p>
                                Account Number :<label>36030899221</label>
                        </p>
                        <p>
                                IFSC CODE : <label>SBIN0004884</label>
                        </p>
                        <p>
                                <input class="form-control" type="text" name="cart[cheque]" id="chequecode" placeholder="Enter Cheque No.">
                        </p>
                        <p class="paymentDetails">
                                Please call on this number 9637385585 to confirm your order.
                        </p>
                    </div>
                    <div class="payonline_details" style="display: none;">
                        <p>
                                YOU WILL BE REDIRECTED TO ONLINE PAYMENT GATEWAY.
                        </p><p>

                    </p></div>
                </div>

            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xm-4 common-form">
                {!! Form::submit('Place an Order', [ 'class'=>'btn btn-success']) !!}
                {!! Form::close() !!}
            </div>
        </div>
            <div class="checkbox terms checkbox pull-left">
                    <label for="agree" class=""><input type="checkbox" required><span class="ob">Confirm Delivery Address</span></label>
                    <div>
                    	<h3>Address</h3>
                    	<p>{{Auth::user()->breakfast}}</p>
                    </div>
            </div>
            <div>

            </div>
        </div>
    </div>
</div>



@endsection