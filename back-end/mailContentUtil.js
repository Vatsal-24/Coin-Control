const header = `<table border="0" cellpadding="0" cellspacing="0" width="60%" style="margin: auto">
<tr>
  <td align="center">
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
            <img src="https://svgshare.com/i/fus.svg" alt="Folktel" border="0" style="display: block;margin: auto;width: 100%;">
        </td>
      </tr>
    </table>
  </td>
</tr>
<tr>
<td align="center" bgcolor="white">
  <table order="0" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 30px 10px 20px 10px; font-family: 'Poppins', sans-serif;">`;

const order1 = `</td>
</tr>
</table>
</td>
</tr>
<tr>
<td align="center" bgcolor="white">
  <table width="100%">
    <tr>
      <td align="center" style="padding: 24px; font-family: 'Poppins', sans-serif; font-size: 20px;font-weight:500; color:#3C3C3C">`;

const order2 = `</td>
      </tr>
    </table>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" width="60%" style="margin: auto">
                          <tr>
        <td align="center" bgcolor="white" style="padding: 24px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center">`;

let footer1 = `</td>
</tr>
</table>
</td>
</tr>
</table>
<table order="0" cellpadding="0" cellspacing="0" width="60%" style="margin: auto">
<tr>
    <td align="center" bgcolor="white">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 840px;">
        <tr>
          <td align="center" style="font-family: 'Poppins', sans-serif; font-size: 20px; line-height: 30px; font-weight:400; color:#3C3C3C">
            <div style="float:left; text-align:left">
              <p><b>Total Amount:</b></p>
              <p>Amount saved: </p>
            </div>
            <div style="float:right; text-align:right">`;
let footer2 = `</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

module.exports = { header, order1, order2, footer1, footer2 };
