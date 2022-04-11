import { Repository, EntityRepository } from 'typeorm';
import { Profile } from './profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {

}
