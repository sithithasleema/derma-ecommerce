import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";

import getOrdersByUserId from "@/actions/getOrdersByUserId";
import OrdersClient from "./OrdersClient";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Not Authorized" />;
  }

  const orders = await getOrdersByUserId(currentUser?.id);

  if (!orders) {
    return <NullData title="No orders yet" />;
  }

  return (
    <div>
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
