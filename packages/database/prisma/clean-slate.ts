import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_ystu3hWg1qcw@ep-late-cake-azb3r3tg-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
    },
  },
});

async function main() {
  console.log('🧹 Purging all sample/fake transactional and demo catalog records...');

  // 1. Delete payment allocations & payments
  await prisma.paymentAllocation.deleteMany({});
  await prisma.payment.deleteMany({});
  console.log('✅ Payments cleared');

  // 2. Delete delivery challans
  await prisma.deliveryChallanItem.deleteMany({});
  await prisma.deliveryChallan.deleteMany({});
  console.log('✅ Delivery Challans cleared');

  // 3. Delete sales & purchase invoices
  await prisma.salesInvoiceItem.deleteMany({});
  await prisma.salesInvoice.deleteMany({});
  await prisma.purchaseInvoiceItem.deleteMany({});
  await prisma.purchaseInvoice.deleteMany({});
  console.log('✅ Sales & Purchase Invoices cleared');

  // 4. Delete quotations
  await prisma.quotationItem.deleteMany({});
  await prisma.quotation.deleteMany({});
  console.log('✅ Quotations cleared');

  // 5. Delete stock & inventory
  await prisma.stockMovement.deleteMany({});
  await prisma.inventoryStock.deleteMany({});
  console.log('✅ Stock movements cleared');

  // 6. Delete parties & addresses
  await prisma.address.deleteMany({});
  await prisma.party.deleteMany({});
  console.log('✅ Sample Customers & Vendors cleared');

  // 7. Delete sample products
  await prisma.product.deleteMany({});
  console.log('✅ Sample Products cleared');

  // Verify foundation remains
  const userCount = await prisma.user.count();
  const fyCount = await prisma.financialYear.count();
  const whCount = await prisma.warehouse.count();

  console.log(`\n🎉 Database Clean Slate Complete!`);
  console.log(`- Active Users preserved: ${userCount}`);
  console.log(`- Financial Years preserved: ${fyCount}`);
  console.log(`- Warehouses preserved: ${whCount}`);
}

main()
  .catch((e) => {
    console.error('Error cleaning database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
