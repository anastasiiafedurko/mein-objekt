const BASE_URL = "http://localhost:4000";

type ApiResponse<T> = {
  successful: boolean;
  result: T;
  user: {
    email: string;
    name: string;
  };
};

export const services = {
  async getAllCourses() {
    const res = await fetch(`${BASE_URL}/courses/all`);
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as ApiResponse<any[]>;
  },
};
