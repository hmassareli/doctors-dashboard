import { getAppointments } from "../services";

describe("getAppointments", () => {
  test("returns appointments array", async () => {
    const appointments = await getAppointments();
    expect(Array.isArray(appointments)).toBe(true);
    expect(appointments.length).toBeGreaterThan(0);
  });
});
