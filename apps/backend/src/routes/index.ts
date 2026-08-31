import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import partiesRoutes from '../modules/parties/parties.routes.js';
import inventoryRoutes from '../modules/inventory/inventory.routes.js';
import quotationsRoutes from '../modules/quotations/quotations.routes.js';
import invoicesRoutes from '../modules/invoices/invoices.routes.js';
import challansRoutes from '../modules/challans/challans.routes.js';
import purchasesRoutes from '../modules/purchases/purchases.routes.js';
import paymentsRoutes from '../modules/payments/payments.routes.js';
import dashboardRoutes from '../modules/dashboard/dashboard.routes.js';
import settingsRoutes from '../modules/settings/settings.routes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/parties', partiesRoutes);
apiRouter.use('/customers', partiesRoutes);
apiRouter.use('/vendors', partiesRoutes);
apiRouter.use('/inventory', inventoryRoutes);
apiRouter.use('/products', inventoryRoutes);
apiRouter.use('/quotations', quotationsRoutes);
apiRouter.use('/invoices', invoicesRoutes);
apiRouter.use('/challans', challansRoutes);
apiRouter.use('/purchases', purchasesRoutes);
apiRouter.use('/payments', paymentsRoutes);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.use('/settings', settingsRoutes);

export default apiRouter;
