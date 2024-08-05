import { MakeDsStub } from './tests/infra/repository/stub/make-ds-stub'

const dsStub = new MakeDsStub()

const main = async () => {
  const { prisma } = await dsStub.build()
  const newMember = await prisma.member.create({
    data: {
      userAccountId: 'user123',
      firstName: 'John',
      lastName: 'Doe',
      customerType: 'regular',
      disabled: false,
      emailVerified: true,
      internalId: 'internal123',
      invoicedBy: 'companyA',
      payrollNumber: 12345.6789,
      role: 'user',
      webParent: 12345.6789,
      settings: { theme: 'dark' },
      contact: { phone: '123-456-7890' },
      branch: { location: 'HQ' },
      wallet: { balance: 100.0 },
      location: { address: '123 Main St' },
      shop: { name: 'Shop1' },
    },
  });

}

main().catch(err => console.log(err))