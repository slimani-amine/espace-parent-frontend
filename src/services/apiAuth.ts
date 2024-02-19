import supabase, { supabaseUrl } from "./supabase";

interface SignupParams {
  fullName: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface UpdateCurrentUserParams {
  password?: string;
  fullName?: string;
  avatar?: File;
}

export async function signup({ fullName, email, password }: SignupParams) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }: LoginParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut({});
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UpdateCurrentUserParams) {
  // 1 update password or fullname
  let updateData: { data?: { fullName?: string }; password?: string } = {};

  if (password) {
    updateData.password = password;
  }

  if (fullName) {
    updateData.data = { fullName };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // 2 upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // 3 update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) {
    throw new Error(error2.message);
  }

  return updatedUser;
}
