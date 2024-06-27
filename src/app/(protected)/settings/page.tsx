import { auth, signOut } from '@/auth';

const SettinsPage = async () => {
  const data = await auth();

  return (
    <div>
      {JSON.stringify(data?.user)}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>Sign Out</button>
      </form>
    </div>
  );
};

export default SettinsPage;
