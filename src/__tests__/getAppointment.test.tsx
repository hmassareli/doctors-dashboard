import { getAppointment } from "../services";

describe("getAppointment", () => {
  test("returns a appointment object", async () => {
    const appointment = await getAppointment("1");
    expect(typeof appointment).toBe("object");
    expect(appointment.id).toBe(1);
  });
});
