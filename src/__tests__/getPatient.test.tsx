import { getPatient } from "../services";

describe("getPatient", () => {
  test("returns a patient object", async () => {
    const patient = await getPatient("1");
    expect(typeof patient).toBe("object");
    expect(patient.id).toBe(1);
  });
});
