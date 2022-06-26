import { AuthGuard } from '@nestjs/passport';
import { Constants } from '../../utils/constants';

export class JwtGuard extends AuthGuard(Constants.JWT) {
  constructor() {
    super();
  }
}
