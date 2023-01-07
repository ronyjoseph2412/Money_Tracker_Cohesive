import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HeaderAndFooterExample({data}) {
  
  
  return (
    <Card>
      <Card.Body>
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <h4>My Balance</h4>
              <Card.Text>
                <h1>₹ {data.balance}</h1>
              </Card.Text>

            </div>
            <div class="col-sm">
              <div class="d-flex flex-column">
                <div class="p-2">
                  <h6>Income</h6>
                  <h3>₹ {data.income}</h3>
                </div>
                <div class="p-2"></div>
                <div class="p-2">
                  <h6>Expenditure</h6>
                  <h3>₹ {data.expense}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default HeaderAndFooterExample;