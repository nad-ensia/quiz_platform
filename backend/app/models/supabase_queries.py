from app.extensions import supabase
from typing import Optional

def get_user_by_rfid(rfid):
    print(f"Querying supabase for RFID: {rfid}")
    response = supabase.table("users").select("*").eq("rfid", rfid).execute()
    print("Supabase response status code:", response.status_code if hasattr(response, 'status_code') else 'N/A')
    print("Supabase response data:", response.data)
    if response.data and len(response.data) > 0:
        return response.data[0]
    return None

def update_user_signup_info(user_id, full_name, email, hashed_pwd):
    print(f"Updating user {user_id} in supabase with full_name={full_name}, email={email}")
    response = supabase.table("users").update({
        "full_name": full_name,
        "email": email,
        "password": hashed_pwd
    }).eq("id", user_id).execute()
    print("Update response status code:", response.status_code if hasattr(response, 'status_code') else 'N/A')
    print("Update response data:", response.data if hasattr(response, 'data') else 'N/A')
    return response

def get_user_by_rfid_password_role(rfid: str, password: str, role: str) -> Optional[dict]:
    response = supabase.table("users")\
        .select("id, full_name, role, rfid, password")\
        .eq("rfid", rfid)\
        .eq("password", password)\
        .eq("role", role)\
        .maybe_single()\
        .execute()

    data = response.data
    error = response.error

    if error or not data:
        return None
    return data