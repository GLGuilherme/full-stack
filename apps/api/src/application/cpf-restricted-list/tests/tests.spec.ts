import { testSuite1 } from './create.controller.spec';
import { testSuite4 } from './delete.controller.spec';
import { testSuite2 } from './get-by-cpf.controller.spec';
import { testSuite3 } from './get.controller.spec';

export const TestCpfRestrictedList = () =>
  describe('sequentially run tests', () => {
    const cpf = '93972408030';

    testSuite1(cpf);
    testSuite2(cpf);
    testSuite3();
    testSuite4(cpf);
  });
