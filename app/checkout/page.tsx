import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";

const Checkout = () => {
  return (
    <Container>
      <FormWrap>
        {" "}
        <CheckoutClient />
      </FormWrap>
    </Container>
  );
};

export default Checkout;
