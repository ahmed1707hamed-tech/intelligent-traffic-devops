output "server_public_ip" {

  value = aws_instance.traffic_server.public_ip

}