export const EditProfile = ({
  onSubmit,
}: {
  onSubmit: ({
    name,
    githubUrl,
    xUrl,
    linkedinUrl,
  }: {
    name: string;
    githubUrl: string;
    xUrl: string;
    linkedinUrl: string;
  }) => void;
}) => {
  return (
    <div>
      <p>Fill out your profile</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const name = formData.get('name') as string;
          const githubUrl = formData.get('githubUrl') as string;
          const xUrl = formData.get('xUrl') as string;
          const linkedinUrl = formData.get('linkedinUrl') as string;
          if (!name) {
            return;
          }
          onSubmit({ name, githubUrl, xUrl, linkedinUrl });
        }}
      >
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="xUrl" placeholder="X URL" />
        <input type="text" name="linkedinUrl" placeholder="LinkedIn URL" />
        <input type="text" name="githubUrl" placeholder="GitHub URL" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
