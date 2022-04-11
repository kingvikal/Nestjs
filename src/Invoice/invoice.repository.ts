import { User } from 'src/auth/user.entity';
import { Repository, EntityRepository } from 'typeorm';
import { Invoice } from './invoice.entity';

@EntityRepository(User)
export class InvoiceRepository extends Repository<Invoice> {
    
}
