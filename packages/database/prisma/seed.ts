import { PrismaClient, UserRole, PartyType, ProductCategory, DocumentStatus, PaymentStatus, PaymentMode, StockMovementType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Dream Decorators ERP Database Seeding...');

  // 1. Clean existing records in reverse dependency order
  console.log('🧹 Cleaning existing tables...');
  await prisma.paymentAllocation.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.deliveryChallanItem.deleteMany();
  await prisma.deliveryChallan.deleteMany();
  await prisma.salesInvoiceItem.deleteMany();
  await prisma.salesInvoice.deleteMany();
  await prisma.purchaseInvoiceItem.deleteMany();
  await prisma.purchaseInvoice.deleteMany();
  await prisma.quotationItem.deleteMany();
  await prisma.quotation.deleteMany();
  await prisma.stockMovement.deleteMany();
  await prisma.inventoryStock.deleteMany();
  await prisma.product.deleteMany();
  await prisma.warehouse.deleteMany();
  await prisma.address.deleteMany();
  await prisma.party.deleteMany();
  await prisma.user.deleteMany();
  await prisma.financialYear.deleteMany();

  // 2. Seed Financial Year
  console.log('📅 Seeding Financial Year...');
  const fy2026 = await prisma.financialYear.create({
    data: {
      code: 'FY2026-27',
      startDate: new Date('2026-04-01T00:00:00Z'),
      endDate: new Date('2027-03-31T23:59:59Z'),
      isCurrent: true,
      isClosed: false,
    },
  });

  // 3. Seed Users with secure password hash
  console.log('👤 Seeding System Users...');
  const passwordHash = await bcrypt.hash('Admin@12345', 10);

  const superAdmin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@dreamdecorators.com',
      password: passwordHash,
      name: 'Priyank Panchal',
      firstName: 'Priyank',
      lastName: 'Panchal',
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  const salesExec = await prisma.user.create({
    data: {
      username: 'sales',
      email: 'sales@dreamdecorators.com',
      password: passwordHash,
      name: 'Rahul Sharma',
      firstName: 'Rahul',
      lastName: 'Sharma',
      role: UserRole.SALES_EXECUTIVE,
      isActive: true,
    },
  });

  // 4. Seed Warehouse
  console.log('🏭 Seeding Warehouses...');
  const mainWarehouse = await prisma.warehouse.create({
    data: {
      code: 'WH-AHM-01',
      name: 'Ahmedabad Central Warehouse',
      location: 'Plot 42, GIDC Phase II, Ahmedabad, Gujarat',
      isActive: true,
    },
  });

  const secondaryWarehouse = await prisma.warehouse.create({
    data: {
      code: 'WH-SUR-01',
      name: 'Surat Distribution Hub',
      location: 'Ring Road Industrial Area, Surat, Gujarat',
      isActive: true,
    },
  });

  // 5. Seed Parties (Customers & Vendors)
  console.log('👥 Seeding Customers & Vendors...');
  const customer1 = await prisma.party.create({
    data: {
      code: 'CUST-001',
      name: 'Aarav Sharma',
      companyName: 'Aarav Designs & Interiors',
      type: PartyType.CUSTOMER,
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      gstin: '24AHBPV9744N1ZL',
      pan: 'AHBPV9744N',
      creditLimit: 500000.0,
      openingBalance: 0.0,
      addresses: {
        create: [
          {
            addressType: 'BILLING',
            addressLine1: '302, Sapphire Business Hub',
            addressLine2: 'SG Highway, Bodakdev',
            city: 'Ahmedabad',
            state: 'Gujarat',
            pincode: '380054',
            isDefault: true,
          },
        ],
      },
    },
  });

  const customer2 = await prisma.party.create({
    data: {
      code: 'CUST-002',
      name: 'Ananya Patel',
      companyName: 'Decor Studio India',
      type: PartyType.CUSTOMER,
      email: 'ananya.p@decorstudio.in',
      phone: '+91 99256 63965',
      gstin: '24AFJPP3546E1ZI',
      pan: 'AFJPP3546E',
      creditLimit: 1000000.0,
      openingBalance: 0.0,
      addresses: {
        create: [
          {
            addressType: 'BILLING',
            addressLine1: 'B-14, Greenview Residency',
            addressLine2: 'Vesu Main Road',
            city: 'Surat',
            state: 'Gujarat',
            pincode: '395007',
            isDefault: true,
          },
        ],
      },
    },
  });

  const vendor1 = await prisma.party.create({
    data: {
      code: 'VEND-001',
      name: 'D’Decor Home Fabrics Ltd',
      companyName: 'D’Decor Home Fabrics Ltd',
      type: PartyType.VENDOR,
      email: 'orders@ddecor.com',
      phone: '+91 22 6678 9000',
      gstin: '27AAACD4567M1Z4',
      pan: 'AAACD4567M',
      creditLimit: 2500000.0,
      openingBalance: 0.0,
      addresses: {
        create: [
          {
            addressType: 'BILLING',
            addressLine1: 'Tower 4, Equinox Business Park',
            addressLine2: 'Kurla West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400070',
            isDefault: true,
          },
        ],
      },
    },
  });

  const vendor2 = await prisma.party.create({
    data: {
      code: 'VEND-002',
      name: 'Somany Wallpaper & Blinds Corp',
      companyName: 'Somany Wallpaper & Blinds Corp',
      type: PartyType.VENDOR,
      email: 'sales@somanydecor.com',
      phone: '+91 11 4123 7788',
      gstin: '07AABCS9821K1ZF',
      pan: 'AABCS9821K',
      creditLimit: 1500000.0,
      openingBalance: 0.0,
      addresses: {
        create: [
          {
            addressType: 'BILLING',
            addressLine1: 'Plot 18, Okhla Industrial Phase III',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110020',
            isDefault: true,
          },
        ],
      },
    },
  });

  // 6. Seed Product Catalog
  console.log('📦 Seeding Products Catalog & Inventory Stock...');
  const productsData = [
    {
      sku: 'CURT-VEL-01',
      name: 'Royal Velvet Blackout Curtain Fabric',
      category: ProductCategory.WINDOW_CURTAINS,
      description: '100% Blackout high-grade 350 GSM velvet fabric',
      hsnCode: '5407',
      unitOfMeasure: 'METERS',
      taxRatePercent: 12.0,
      purchasePrice: 450.0,
      sellingPrice: 850.0,
      minStockLevel: 50,
    },
    {
      sku: 'CURT-SHEER-02',
      name: 'Luxury Linen Translucent Sheer Curtain',
      category: ProductCategory.WINDOW_CURTAINS,
      description: 'Elegant textured lightweight airy sheer material',
      hsnCode: '5407',
      unitOfMeasure: 'METERS',
      taxRatePercent: 12.0,
      purchasePrice: 280.0,
      sellingPrice: 550.0,
      minStockLevel: 40,
    },
    {
      sku: 'BLIND-MOT-01',
      name: 'Motorized Zebra Roller Blind - Slate Grey',
      category: ProductCategory.WINDOW_BLINDS,
      description: 'Dual-layer motorized roller blind with RF remote',
      hsnCode: '6303',
      unitOfMeasure: 'SQ_FT',
      taxRatePercent: 18.0,
      purchasePrice: 120.0,
      sellingPrice: 220.0,
      minStockLevel: 100,
    },
    {
      sku: 'WALL-GEO-01',
      name: 'Italian Metallic Geometric Wallpaper Roll',
      category: ProductCategory.WALLPAPERS,
      description: 'Embossed vinyl non-woven metallic finish (57 sq.ft/roll)',
      hsnCode: '4814',
      unitOfMeasure: 'ROLLS',
      taxRatePercent: 18.0,
      purchasePrice: 1600.0,
      sellingPrice: 3200.0,
      minStockLevel: 20,
    },
    {
      sku: 'MATT-ORTHO-01',
      name: 'Orthopedic Memory Foam Mattress (King 78x72)',
      category: ProductCategory.MATTRESSES,
      description: '8-inch triple zone posture support cooling foam',
      hsnCode: '9404',
      unitOfMeasure: 'PIECES',
      taxRatePercent: 18.0,
      purchasePrice: 14500.0,
      sellingPrice: 24500.0,
      minStockLevel: 5,
    },
    {
      sku: 'CARP-PER-01',
      name: 'Hand-Tufted Persian Silk Rug (8x10 ft)',
      category: ProductCategory.CARPETS,
      description: 'Pure New Zealand wool with bamboo silk highlights',
      hsnCode: '5702',
      unitOfMeasure: 'PIECES',
      taxRatePercent: 18.0,
      purchasePrice: 28000.0,
      sellingPrice: 48000.0,
      minStockLevel: 3,
    },
  ];

  const createdProducts = [];
  for (const item of productsData) {
    const prod = await prisma.product.create({
      data: item,
    });
    createdProducts.push(prod);

    // Create Initial Warehouse Stock
    const initialQty = 150;
    await prisma.inventoryStock.create({
      data: {
        productId: prod.id,
        warehouseId: mainWarehouse.id,
        quantity: initialQty,
      },
    });

    // Log Stock Movement
    await prisma.stockMovement.create({
      data: {
        productId: prod.id,
        warehouseId: mainWarehouse.id,
        movementType: StockMovementType.INWARD_PURCHASE,
        quantity: initialQty,
        referenceNo: 'INIT-STOCK-2026',
        remarks: 'Opening initial inventory stock balance',
      },
    });
  }

  // 7. Seed Sample Quotation
  console.log('📝 Seeding Sample Quotations...');
  const quotation = await prisma.quotation.create({
    data: {
      quotationNumber: 'QT-2026-0001',
      date: new Date('2026-08-15T00:00:00Z'),
      validUntil: new Date('2026-09-15T00:00:00Z'),
      partyId: customer1.id,
      financialYearId: fy2026.id,
      createdById: superAdmin.id,
      status: DocumentStatus.APPROVED,
      subTotal: 85000.0,
      taxAmount: 10200.0,
      discountAmount: 5000.0,
      grandTotal: 90200.0,
      notes: 'Premium master bedroom curtain and sheer setup.',
      terms: '50% advance along with order confirmation. Balance upon installation completion.',
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            description: 'Royal Velvet Blackout Curtain Fabric (Pleated)',
            quantity: 50.0,
            unitRate: 850.0,
            taxPercent: 12.0,
            taxAmount: 5100.0,
            discountPercent: 5.0,
            totalAmount: 45475.0,
          },
          {
            productId: createdProducts[1].id,
            description: 'Luxury Linen Translucent Sheer Curtain',
            quantity: 45.0,
            unitRate: 550.0,
            taxPercent: 12.0,
            taxAmount: 2970.0,
            discountPercent: 0.0,
            totalAmount: 27720.0,
          },
        ],
      },
    },
  });

  // 8. Seed Sample Sales Invoice
  console.log('🧾 Seeding Sample Sales Invoices & Challans...');
  const invoice = await prisma.salesInvoice.create({
    data: {
      invoiceNumber: 'INV-2026-0001',
      date: new Date('2026-08-20T00:00:00Z'),
      dueDate: new Date('2026-09-04T00:00:00Z'),
      partyId: customer1.id,
      financialYearId: fy2026.id,
      createdById: superAdmin.id,
      quotationId: quotation.id,
      status: DocumentStatus.APPROVED,
      paymentStatus: PaymentStatus.PARTIALLY_PAID,
      subTotal: 85000.0,
      taxAmount: 10200.0,
      discountAmount: 5000.0,
      grandTotal: 90200.0,
      paidAmount: 50000.0,
      balanceAmount: 40200.0,
      notes: 'Delivered and installed at Bodakdev site.',
      terms: 'Payment due within 15 days of invoice date.',
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            description: 'Royal Velvet Blackout Curtain Fabric (Pleated)',
            quantity: 50.0,
            unitRate: 850.0,
            taxPercent: 12.0,
            taxAmount: 5100.0,
            discountPercent: 5.0,
            totalAmount: 45475.0,
          },
        ],
      },
    },
  });

  // 9. Seed Delivery Challan
  await prisma.deliveryChallan.create({
    data: {
      challanNumber: 'DC-2026-0001',
      date: new Date('2026-08-20T00:00:00Z'),
      partyId: customer1.id,
      warehouseId: mainWarehouse.id,
      financialYearId: fy2026.id,
      salesInvoiceId: invoice.id,
      createdById: superAdmin.id,
      status: DocumentStatus.FULFILLED,
      dispatchDetails: 'Dispatched via In-House Delivery Van (GJ-01-XX-9876)',
      notes: 'Customer signed POD received on site.',
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            quantity: 50.0,
            description: 'Velvet Curtain Fabric Stitched Sets',
          },
        ],
      },
    },
  });

  // 10. Seed Payment Receipt
  console.log('💳 Seeding Payment Receipts & Allocations...');
  const payment = await prisma.payment.create({
    data: {
      voucherNumber: 'PAY-REC-2026-0001',
      date: new Date('2026-08-20T00:00:00Z'),
      paymentType: 'RECEIPT',
      partyId: customer1.id,
      financialYearId: fy2026.id,
      createdById: superAdmin.id,
      amount: 50000.0,
      paymentMode: PaymentMode.UPI,
      referenceNo: 'UPI/623309182390/HDFC',
      notes: 'Advance 50k payment received via UPI',
      allocations: {
        create: [
          {
            salesInvoiceId: invoice.id,
            allocatedAmount: 50000.0,
          },
        ],
      },
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log(`
  ======================================================
  🎉 DREAM DECORATORS ERP SEEDED TEST CREDENTIALS:
  ------------------------------------------------------
  Super Admin Email: admin@dreamdecorators.com
  Password:         Admin@12345
  Role:             SUPER_ADMIN
  Financial Year:   FY2026-27 (Current & Active)
  ======================================================
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
