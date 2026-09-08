<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        * { font-family: 'Helvetica', sans-serif; margin: 0; padding: 0; box-sizing: border-box; }
        body { color: #0F172A; font-size: 13px; padding: 40px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #FF6B00; padding-bottom: 20px; margin-bottom: 30px; }
        .brand-name { font-size: 22px; font-weight: bold; color: #FF6B00; }
        .brand-sub { font-size: 11px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
        .invoice-title { text-align: right; }
        .invoice-title h1 { font-size: 26px; color: #0F172A; letter-spacing: 2px; }
        .invoice-title .num { font-size: 12px; color: #64748B; margin-top: 4px; }
        .meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .meta-block { font-size: 12px; line-height: 1.6; }
        .meta-block .label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8; font-weight: bold; margin-bottom: 4px; }
        .meta-block strong { color: #0F172A; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        thead th { background: #0F172A; color: #fff; text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
        thead th.right { text-align: right; }
        tbody td { padding: 12px; border-bottom: 1px solid #E2E8F0; }
        tbody td.right { text-align: right; }
        .totals { width: 260px; margin-left: auto; }
        .totals .row { display: flex; justify-content: space-between; padding: 6px 12px; font-size: 13px; }
        .totals .grand { background: #FFF3EB; border: 1px solid #FF6B00; border-radius: 6px; font-weight: bold; color: #CC5500; font-size: 15px; margin-top: 6px; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #94A3B8; text-align: center; line-height: 1.6; }
        .paid-badge { display: inline-block; background: #16A34A; color: #fff; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
    </style>
</head>
<body>
    <div class="header">
        <div>
            {{-- logo chaile: <img src="{{ public_path('images/logo/final_logo.png') }}" style="height:40px;"> --}}
            <div class="brand-name">HiLights Football</div>
            <div class="brand-sub">Player Discovery Platform</div>
        </div>
        <div class="invoice-title">
            <h1>INVOICE</h1>
            <div class="num">#{{ $invoice->number ?? $invoice->id }}</div>
            <div style="margin-top:8px;"><span class="paid-badge">Paid</span></div>
        </div>
    </div>

    <div class="meta">
        <div class="meta-block">
            <div class="label">Billed To</div>
            <strong>{{ $customer->name }}</strong><br>
            {{ $customer->email }}<br>
            @if($customer->pm_type){{ ucfirst($customer->pm_type) }} •••• {{ $customer->pm_last_four }}@endif
        </div>
        <div class="meta-block" style="text-align:right;">
            <div class="label">Invoice Details</div>
            <strong>Date:</strong> {{ $invoice->date()->format('M d, Y') }}<br>
            <strong>Invoice #:</strong> {{ $invoice->number ?? $invoice->id }}
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th class="right">Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->invoiceItems() as $item)
            <tr>
                <td>{{ $item->description }}</td>
                <td class="right">{{ $item->total() }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals">
        <div class="row"><span>Subtotal</span><span>{{ $invoice->subtotal() }}</span></div>
        @if($invoice->hasDiscount())
        <div class="row"><span>Discount</span><span>-{{ $invoice->discount() }}</span></div>
        @endif
        <div class="row grand"><span>Total Paid</span><span>{{ $invoice->total() }}</span></div>
    </div>

    <div class="footer">
        HiLights Football • billing@hilightsfootball.com • hilightsfootball.com<br>
        Thank you for being part of the HiLights Football network.
    </div>
</body>
</html>