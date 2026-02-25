import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

type PageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function Order({ params }: PageProps) {
  const { orderId } = await params;

  const order = await getOrderById(orderId);

  if (!order) return <NullData title="No order found" />;

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
        <div className="mt-20 flex flex-col gap-4" />
      </Container>
    </div>
  );
}
